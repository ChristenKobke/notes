<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-sheet class="pa-4">
          <h1 class="text-h4">Notes App</h1>
        </v-sheet>
      </v-col>

      <!-- Add Note -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-4">
          <h2 class="text-h6 mb-2">Add Note</h2>
          <v-text-field v-model="noteTitle" label="Title"></v-text-field>
          <v-textarea v-model="noteContent" label="Content"></v-textarea>
          <v-btn color="primary" @click="addNote">Add Note</v-btn>
        </v-card>
      </v-col>

      <!-- Notes List -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-4" v-for="note in notes" :key="note.id">
          <h3 class="text-subtitle-1">{{ note.title }}</h3>
          <p>{{ note.content }}</p>
          <small>Created: {{ note.createdAt }}</small>
          <small v-if="note.updatedAt">Updated: {{ note.updatedAt }}</small>
          <v-btn color="error" small @click="deleteNote(note.id)">Delete</v-btn>
        </v-card>
      </v-col>

      <!-- Add To-Do -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-4">
          <h2 class="text-h6 mb-2">Add To-Do</h2>
          <v-text-field v-model="todoTitle" label="To-Do Title"></v-text-field>
          <v-btn color="success" @click="addTodo">Add To-Do</v-btn>
        </v-card>
      </v-col>

      <!-- To-Dos List -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-4" v-for="todo in todos" :key="todo.id">
          <v-checkbox v-model="todo.done" @change="updateTodo(todo)">{{ todo.title }}</v-checkbox>
          <small>Created: {{ todo.createdAt }}</small>
          <v-btn color="error" small @click="deleteTodo(todo.id)">Delete</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { getNotes, saveNotes } from '../store/storage.js'

const noteTitle = ref('')
const noteContent = ref('')
const todoTitle = ref('')

const allNotes = ref(getNotes())
const notes = ref(allNotes.value.filter(n => !n.done))
const todos = ref(allNotes.value.filter(n => n.done))

function refreshNotes() {
  notes.value = allNotes.value.filter(n => !n.done)
  todos.value = allNotes.value.filter(n => n.done)
}

function addNote() {
  const newNote = {
    id: Date.now().toString(),
    title: noteTitle.value,
    content: noteContent.value,
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  allNotes.value.push(newNote)
  saveNotes(allNotes.value)
  refreshNotes()
  noteTitle.value = ''
  noteContent.value = ''
}

function addTodo() {
  const newTodo = {
    id: Date.now().toString(),
    title: todoTitle.value,
    done: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  allNotes.value.push(newTodo)
  saveNotes(allNotes.value)
  refreshNotes()
  todoTitle.value = ''
}

function deleteNote(id) {
  allNotes.value = allNotes.value.filter(n => n.id !== id)
  saveNotes(allNotes.value)
  refreshNotes()
}

function deleteTodo(id) {
  allNotes.value = allNotes.value.filter(n => n.id !== id)
  saveNotes(allNotes.value)
  refreshNotes()
}

function updateTodo(todo) {
  todo.updatedAt = new Date().toISOString()
  saveNotes(allNotes.value)
}
</script>
