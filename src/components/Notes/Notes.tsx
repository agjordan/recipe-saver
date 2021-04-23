import React, {useState, useEffect} from "react";
import styles from "./Notes.module.scss";
import { Edit } from "react-feather";
import { updateNotes } from '../../services/recipe.service';
import autosize from 'autosize';


interface INotesProps {
  notes: string
  userId: string
  docId: string
}



const Notes = ({notes, userId, docId}: INotesProps) => {

  const [displayNotes, setDisplayNotes] = useState(notes)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const el = document.querySelectorAll('textarea');
    autosize(el)
    if (editing) el[0].focus()
  }, [editing])

  const editNotes = () => {
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
  }

  const saveNotes = (event: any) => {
    event.preventDefault()
    const newNotes: null | string  = event.target[0].value
    updateNotes(userId, docId, newNotes || '')
    setDisplayNotes(newNotes || '')
    setEditing(false)
  }

  

  return (
    <div className={styles.notes}>
      <div className={styles.notesHeader}>
        <h2>Notes</h2>
        <div className={styles.svgIcon}>
          <Edit onClick={editNotes}/>
        </div>
      </div>
      {editing ?
      <form onSubmit={saveNotes}>
        <textarea id='notesField' className={styles.editNotes} defaultValue={displayNotes} />
        <span className={styles.cancelEdit} onClick={cancelEdit}>Cancel</span>
        <button type='submit' className={styles.saveButton} >Save</button>
      </form> : <p className={styles.viewNotes} onClick={editNotes}>{displayNotes}</p>}
      
    </div>
  );
};

export default Notes;
