import {Faculty} from "@/classes/faculty";
import {Major} from "@/classes/major";
import {Athlete} from "@/classes/athlete";
import {Event} from "@/classes/event";
import axios from "axios";
import {backendUrl} from "@/classes/constants";
import {NormalTeam} from "@/classes/normal-team";

export function deleteFaculty(id: number) {

}

export function deleteAthlete(id: number) {

}

export async function createFormData(url: string, formData: FormData,
                                     onError: () => void, onSuccess: () => void) {

  try {
    const res = await axios.post(
      `${backendUrl}${url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    if (res.status === 201) {
      onSuccess();
    } else {
      onError();
    }
  } catch (e) {
    onError();
  }
}

export async function fetchTeams(): Promise<NormalTeam[]> {
  const response = await axios.get(`${backendUrl}/NormalTeams`);
  return response.data;
}

export async function editFormData(url: string, id: number, formData: FormData,
                                   onError: () => void, onSuccess: () => void) {
  try {
    const res = await axios.put(
      `${backendUrl}${url}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    if (res.status === 200) {
      onSuccess();
    } else {
      onError();
    }
  } catch (e) {
    onError();
  }
}

export async function fetchFaculties(): Promise<Faculty[]> {
  const response = await axios.get(`${backendUrl}/Faculties`);
  return response.data;
}

export async function fetchMajors(facultyId: number): Promise<Major[]> {
  const response = await axios.get(`${backendUrl}/Majors?facultyId=${facultyId}`);
  return response.data;
}

export async function fetchAthletes(): Promise<Athlete[]> {
  const response = await axios.get(`${backendUrl}/Athletes`);
  return response.data;
}

export async function fetchEvents(): Promise<Event[]> {
  const response = await axios.get(`${backendUrl}/Events`);
  return response.data;
}