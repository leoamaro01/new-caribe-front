import {Faculty} from "@/classes/faculty";
import {Major} from "@/classes/major";
import {Athlete} from "@/classes/athlete";
import {Event} from "@/classes/event";
import axios from "axios";
import {authTokenStorageKey, backendUrl} from "@/classes/constants";

export async function deleteFaculty(id: number) {
  const token = localStorage.getItem(authTokenStorageKey)!;

  try {
    await axios.delete(
      `${backendUrl}/Faculties/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
  } catch (e) {
    console.error(e);
  }
}

export async function deleteAthlete(id: number) {
  const token = localStorage.getItem(authTokenStorageKey)!;

  try {
    await axios.delete(
      `${backendUrl}/Athletes/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
  } catch (e) {
    console.error(e);
  }
}

export async function createFormData(url: string, formData: FormData,
                                     onError: () => void, onSuccess: () => void) {
  const token = localStorage.getItem(authTokenStorageKey)!;

  try {
    const res = await axios.post(
      `${backendUrl}${url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
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

export async function SignIn(formData: FormData,
                             onError: () => void, onSuccess: (token: string) => void) {
  try {
    const res = await axios.post(
      `${backendUrl}/Account/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

    if (res.status === 200) {
      onSuccess(res.data.token);
    } else {
      onError();
    }
  } catch (e) {
    onError();
  }
}

export async function SignUp(formData: FormData,
                             onError: () => void, onSuccess: (token: string) => void) {
  try {
    const res = await axios.post(
      `${backendUrl}/Account/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    if (res.status === 201) {
      onSuccess(res.data.token);
    } else {
      onError();
    }
  } catch (e) {
    onError();
  }
}

export async function IsLoggedIn() {
  const token = localStorage.getItem(authTokenStorageKey);

  if (token === null)
    return false;

  return axios.get(`${backendUrl}/Account`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => {
    if (!res.data) {
      localStorage.removeItem(authTokenStorageKey);
      return false;
    }
    return true;
  });
}

export async function HasPrivileges() {
  const token = localStorage.getItem(authTokenStorageKey);

  if (token === null)
    return false;

  return axios.get(`${backendUrl}/Account/modify`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.data);
}

export async function editFormData(url: string, id: number, formData: FormData,
                                   onError: () => void, onSuccess: () => void) {
  const token = localStorage.getItem(authTokenStorageKey)!;

  try {
    const res = await axios.put(
      `${backendUrl}${url}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

    if (res.status === 200 || res.status === 204) {
      onSuccess();
    } else {
      onError();
    }
  } catch (e) {
    onError();
  }
}

export async function FetchFacultyPhoto(facultyId: number): Promise<File> {
  const response = await axios.get(`${backendUrl}/Faculties/${facultyId}/photo`, {
    responseType: 'blob'
  });

  return response.data;
}

export async function FetchAthletePhoto(athleteId: number): Promise<File> {
  const response = await axios.get(`${backendUrl}/Athletes/${athleteId}/photo`, {
    responseType: 'blob'
  });

  return response.data;
}

export async function fetchFaculties(): Promise<Faculty[]> {
  return await axios.get(`${backendUrl}/Faculties`)
    .then((res) => res.data);
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