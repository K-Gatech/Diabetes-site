import json
import re

#this script was edited to account for not having manually edited synthea data in the mix

# Remove digits from a string
def remove_digits(s):
    return re.sub(r'\d+', '', s).strip()

# Use your path and change name if needed
patient_file_path = './Patients/Patient.ndjson'  
observation_file_path = './Observations/Observation.ndjson'

patients = {}
a1c_results = {}
gender_counter = {'male': 1, 'female': 1, 'other': 1}  # Start counters at 1

# Analyze data
with open(patient_file_path, 'r', encoding='utf-8') as pf:
    for line in pf:
        patient = json.loads(line)
        patient_id = patient['id']
        name = " ".join([remove_digits(n) for n in patient['name'][0].get('given', [])]) + " " + remove_digits(patient['name'][0].get('family', ''))
        gender = patient.get('gender', 'unknown').lower() 
        gender_id = f"{gender_counter[gender]}{gender[0].upper()}"
        gender_counter[gender] += 1
        patients[patient_id] = {'name': name.strip(), 'gender': gender, 'gender_id': gender_id}

# organize A1C results by patient
with open(observation_file_path, 'r', encoding='utf-8') as of:
    for line in of:
        observation = json.loads(line)
        if observation['code']['coding'][0]['code'] == '4548-4':  # A1C LOINC code
            patient_id = observation['subject']['reference'].split('/')[-1]
            a1c_result = observation['valueQuantity']['value']
            a1c_date = observation['effectiveDateTime']
            a1c_results.setdefault(patient_id, []).append({"a1c": a1c_result, "date": a1c_date})

# json export
patients_for_json = []
for patient_id, a1c_list in a1c_results.items():
    if patient_id in patients:
        patient_info = patients[patient_id]
        patient_record = {
            "id": patient_id,
            "name": patient_info["name"],
            "gender": patient_info["gender"].capitalize(),
            "gender_id": patient_info["gender_id"],
            "a1cResults": a1c_list[:2]  # Only takes the first two A1C results
        }
        patients_for_json.append(patient_record)
        if len(patients_for_json) >= 15:  # 15 patients
            break

#its called data to match whats in the website repo 
with open('data.json', 'w', encoding='utf-8') as json_file:
    json.dump(patients_for_json, json_file, indent=2)
 