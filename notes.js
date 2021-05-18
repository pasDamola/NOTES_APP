const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
    const notes = loadNotes()
    console.log(chalk.green.inverse.bold('Your notes...'))
    notes.forEach(note => console.log(note.title))
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.find(note => note.title === title)

    if(duplicateNotes){
        console.log(chalk.red.inverse.bold('Note title already added'))
    } else {
        notes.push({
            title: title,
            body: body
        })
 
        saveNotes(notes)
        console.log(chalk.green.inverse.bold("New title successfully added"))
    }
    

}

const saveNotes = (notes) => {
    const noteString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', noteString)
}

const loadNotes = () => {
    
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)   
    } catch (error) {
        return []   
    }
    

}


const removeNote = (title) => {
    const notes = loadNotes()

    const notesLeft = notes.filter(note => note.title !== title)

    // if the note doesn't exist, return message

    if(notes.length !== notesLeft.length) {
        saveNotes(notesLeft)
        console.log(chalk.green.inverse.bold('Note has been removed'))
    } else {
        console.log(chalk.blue.inverse.bold(`${title} does not exist in the file`))
    }
}

const readNote = (title) => {
    const notes = loadNotes(title)

    const noteToRead = notes.find(note => note.title === title)

    if(noteToRead) {
        console.log(chalk.green('Note found'))
        console.log(noteToRead)
    } else {
        console.log(chalk.red.inverse.bold(`${title} does not exist in the file`))
    }
}

module.exports = { getNotes, addNote, removeNote, readNote }