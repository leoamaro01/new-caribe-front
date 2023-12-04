import Image from "next/image";
import {Faculty} from "@/classes/faculty";
import Link from "next/link";

export default function FacultyComponent(faculty: Faculty) {
  let rankingColor;
  switch (faculty.ranking) {
    case 1:
      rankingColor = "text-yellow-400";
      break;
    case 2:
      rankingColor = "text-gray-400";
      break;
    case 3:
      rankingColor = "text-yellow-800";
      break;
    default:
      rankingColor = "";
      break;
  }
  return (
    <div
      className="rounded-3xl border-2 border-opacity-5 bg-gray-800/20 transition-all hover:bg-gray-700/20 p-5 m-5"
      key={faculty.id}>
      <div className="flex">
        <Image
          className="rounded-3xl flex-shrink-0"
          src={faculty.logo}
          alt={`${faculty.acronym} logo`}
          width={125}
          height={125}
        />
        <div className="ml-4">
          <h1 className="font-bold text-4xl">
            {faculty.acronym}
          </h1>
          <h2 className="text-2xl">
            {faculty.name}
          </h2>
        </div>
        <h1 className={"text-5xl italic text-right flex-grow " + rankingColor}>
          #{faculty.ranking}
        </h1>
      </div>
      <p className="text-center m-5 text-2xl">🐶 Mascota: {faculty.mascot}</p>
      <div className="grid grid-cols-3 mt-10">
        <p className="text-center text-xl">🥇 Medallas de Oro: {faculty.goldMedals}</p>
        <p className="text-center text-xl">🥈 Medallas de Plata: {faculty.silverMedals}</p>
        <p className="text-center text-xl">🥉 Medallas de Bronce: {faculty.bronzeMedals}</p>
      </div>
      <div
        className="text-center text-2xl italic font-bold mt-10 mb-5">
        <Link
          href={`/faculties/${faculty.acronym.toLowerCase()}`}>
          Ir a la página de {faculty.acronym}
        </Link>
      </div>
    </div>
  );
}