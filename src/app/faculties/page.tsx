import {Faculty} from "@/classes/faculty";
import FacultyComponent from "@/components/FacultyComponent";
import {fetchFaculties} from "@/classes/utilities";

export default function FacultiesPage() {
  const fetchedFaculties: Faculty[] = fetchFaculties();

  return <div className="items-center pl-40 pr-40 pt-12">
    <h1 className="text-8xl text-center m-6">Facultades</h1>
    <div className="grid lg:grid-cols-2">
      {fetchedFaculties.map(f => FacultyComponent(f))}
    </div>
  </div>
} 