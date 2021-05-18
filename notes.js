const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
    return '..Your Notes'
}

const addNote = function(title, body) {
    const notes = loadNotes()

    const duplicateNotes = notes.filter(note => note.title === title)

    if(duplicateNotes.length > 0){
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

const saveNotes = function(notes) {
    const noteString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', noteString)
}

const loadNotes = function() {
    
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)   
    } catch (error) {
        return []   
    }
    

}


const removeNote = function(title) {
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

module.exports = { getNotes, addNote, removeNote}