import {fetchFaculties} from "@/classes/utilities";
import Image from "next/image";
import {AthleteComponent} from "@/components/AthleteComponent";
import {FacultyImage} from "@/components/FacultyComponent";

export default function FacultyPage({params}: { params: { name: string } }) {

  const faculty = fetchFaculties().find(f => f.acronym.toLowerCase() === params.name.toLowerCase());

  if (!faculty)
    return <h1 className="text-4xl text-center m-6 absolute top-1/3 w-full">:(<br/><br/>No se encontró la
      facultad</h1>;

  return <div className="p-20">
    <div className="flex">
      {FacultyImage(faculty, "rounded-3xl flex-shrink-0",250,250)}
      <div className="ml-10 flex flex-col justify-center">
        <h1 className="font-bold text-8xl">
          {faculty.acronym}
        </h1>
        <h2 className="text-4xl">
          {faculty.name}
        </h2>
      </div>
    </div>
    <h1 className="text-center text-8xl m-20">
      Atletas
    </h1>
    <div className="grid lg:grid-cols-2">
      {faculty.athletes.map(AthleteComponent)}
    </div>
  </div>
}