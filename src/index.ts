import { faker } from "@faker-js/faker"

const S = 3e5
let p0
let p1

const arr = new Array(S).fill(undefined).map(e => {
  const sex = faker.person.sex()
  const firstName = faker.person.firstName(sex)
  const lastName = faker.person.lastName(sex)
  const name = faker.person.fullName({ firstName, lastName, sex })
  const email = faker.internet.email({ firstName, lastName })
  return { name, email }
})

const indicatorEl: HTMLInputElement = document.getElementById('indicator')
const mainEl: HTMLElement = document.getElementById('main')

indicatorEl.classList.add('hidden')
mainEl.classList.remove('hidden')

let query = ''

const inputEl: HTMLInputElement = document.getElementById('search-input')
const resultsEl: HTMLElement = document.getElementById('search-results')

inputEl?.addEventListener('input', (e: InputEvent) => {
  query = e.target?.value.toLowerCase()

  const matches = []
  arr.forEach(e => {
    if (e.name.toLowerCase().includes(query) || e.email.toLowerCase().includes(query))
      matches.push(e)
  })

  while (resultsEl.firstChild) {
    resultsEl.removeChild(resultsEl.firstChild);
  }

  matches.slice(0, 100).forEach(e => {
    const nameText = document.createTextNode(e.name);
    const emailText = document.createTextNode(e.email);
    const newEl = document.createElement("div")
    newEl.classList.add('flex', 'justify-between','text-base', 'text-slate-600')
    const namePEl = document.createElement("p")
    namePEl.innerText = e.name
    const emailPEl = document.createElement("p")
    emailPEl.innerText = e.email

    newEl.appendChild(namePEl);
    newEl.appendChild(emailPEl);
    resultsEl?.appendChild(newEl)
  })
})