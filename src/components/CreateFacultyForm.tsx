'use client'

import {FormEventHandler} from "react";

export default function CreateFacultyForm({onSubmit}: { onSubmit: FormEventHandler<HTMLFormElement> }) {
  return <form onSubmit={onSubmit}>
    <label>
      Name:
      <input name="name" type="text"/>
    </label>
    <label>
      Acronym:
      <input name="acronym" type="text"/>
    </label>
    <label>
      Mascot:
      <input name="mascot" type="text"/>
    </label>
    <label>
      Logo:
      <input name="logo" type="text"/>
    </label>
    <button type="submit">Submit</button>
  </form>;
}