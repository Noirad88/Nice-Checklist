class Note{
    constructor(){
        this.id = 'note-' + crypto.randomUUID()
        this.text = ""
        this.done = false
        this.archived = false
    }

    handleOnDelete(){
        this.archived = !this.archived
    }

    handleOnDone(e){
        this.done = e.target.checked
    }

    handleOnTextChange(e){
        this.text = e.target.value
    }

    getHTML(){
        return `
                <div id=${this.id} class='note-item ${this.archived == true ? 'is-archived' : ''} ${this.done == true ? 'is-done' : ''}'>
                    <input title='done' name='done' type='checkbox' value='done' class='note-done' ${this.done && 'checked'}/>
                    <input title='note text' name='note text' class='note-text' type='text' value='${this.text}'>
                    <button title='delete note' name='delete note' class='note-button note-delete'>${this.archived ? 'Un-hide' : 'Hide'}</button>
                </div>
            `
    }

}

class NotesManager{

    constructor(){
        this._notes = []
        this.notesContainer = document.querySelector('#notes-container')
        this.showArchived = false
    }

    addNote(){
        const newNote = new Note
        this._notes.push(newNote)
        this.render()
    }

    render(){

        this.notesContainer = document.querySelector('#notes-container')
        this.notesContainer.innerHTML = ''

        const activeNotes = this._notes.filter((note) => {
            return (this.showArchived == true) || (this.showArchived == false && note.archived == false)
        })

        activeNotes.map((note)=>{

            const noteElement = note.getHTML()

            this.notesContainer.insertAdjacentHTML('beforeend',noteElement)

            const noteCheck = this.notesContainer.querySelector(`#${note.id} input.note-done`)
            noteCheck.addEventListener('change',(e)=>{
                note.handleOnDone(e)
                this.render()

            })

            const noteClose = this.notesContainer.querySelector(`#${note.id} button.note-delete`)
            noteClose.addEventListener('click',()=>{
                note.handleOnDelete()
                this.render()
            })

            const noteText = this.notesContainer.querySelector(`#${note.id} input.note-text`)
            noteText.addEventListener('input',(e)=>{
                note.handleOnTextChange(e)
            })

        })
    }
}

const noteList = new NotesManager()

document.querySelector('#nav-add-note').addEventListener('click',()=>{
    noteList.addNote()
})

document.addEventListener('DOMContentLoaded',()=>{
    noteList.addNote()
})

document.querySelector('#nav-show-complete').addEventListener('change',(e)=>{
    const showCompleteState = e.target.checked
    noteList.showArchived = showCompleteState
    noteList.render()
})
    
