import Image from "next/image";
import {Athlete} from "@/classes/athlete";

export function AthleteComponent(athlete: Athlete) {
  return (
    <div
      className="rounded-3xl border-2 border-opacity-5 bg-gray-800/20 transition-all hover:bg-gray-700/20 p-5 m-5"
      key={athlete.id}>
      <div className="flex">
        <Image
          className="rounded-3xl flex-shrink-0"
          src={athlete.photo}
          alt={`${athlete.nick} picture`}
          width={125}
          height={125}
        />
        <div className="ml-4">
          <h1 className="font-bold text-4xl">
            {athlete.name}
          </h1>
          <h2 className="text-2xl">
            &quot;{athlete.nick}&quot;
          </h2>
          <p>
            Fecha de Nacimiento: {athlete.dateOfBirth.toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}