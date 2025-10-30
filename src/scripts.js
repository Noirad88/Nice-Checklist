let v4

( async() =>{
    try{
        const module = await import('../node_modules/uuid/dist/v4.js');
        v4 = module.default;

        class Note{
            id = null
            text = ""
            done = false
            archived = false

            handleOnDelete(){
                this.archived = true
            }

            handleOnDone(e){
                this.done = e.target.checked
            }

            handleOnTextChange(e){
                this.text = e.target.value
            }

            getHTML(){
                return `
                        <div id=${this.id} class='note-item ${this.archived && 'archived'}'>
                            <input title='done' name='done' type='checkbox' value='done' class='note-done' ${this.done && 'checked'}/>
                            <input title='note text' name='note text' class='note-text' type='text' value='${this.text}'>
                            <button title='delete note' name='delete note' class='note-button note-delete'>Delete</button>
                        </div>
                    `
            }

        }

        class NotesManager{

            constructor(){
                this._notes = []
                this.notesContainer = document.querySelector('#notes-container')
            }

            addNote(){
                const noteId = 'note-' + v4()
                const newNote = new Note
                newNote.id = noteId
                this._notes.push(newNote)
                this.render()
            }

            render(){

                this.notesContainer = document.querySelector('#notes-container')
                this.notesContainer.innerHTML = ''

                const activeNotes = this._notes.filter((note) => note.archived != true)

                activeNotes.map((note)=>{

                    const noteElement = note.getHTML()

                    this.notesContainer.insertAdjacentHTML('beforeend',noteElement)

                    const noteCheck = this.notesContainer.querySelector(`#${note.id} input.note-done`)
                    noteCheck.addEventListener('change',(e)=>{
                        note.handleOnDone(e)
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
    }
    catch(e){
        console.error(e)
    }
})()
