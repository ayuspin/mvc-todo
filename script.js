class Model {
  constructor() {
    this.data = {'Title':'Initial title'}
  }

  callbackController (callback) {
    this.mutateData = callback
  }

}

class View {
  constructor () {
    this.root = document.getElementById('root')
    this.title = document.createElement('h1')
    this.input = document.createElement('input')
    this.input.placeholder = 'Type your own title'
    this.root.append(this.title, this.input)
    console.log('Executing View constructor')
  }

  assignDataToElements (data) {
    this.title.textContent = data['Title']
    console.log('Executing assignDataToElements')
  }

  callbackController (callback) {
    this.input.addEventListener('focusout', (event) => {
    callback({'Title' : event.target.value})
    })


  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.callbackController(this.passToModel.bind(this))
    this.model.callbackController(this.passToView.bind(this))
  }

  passToModel(data) {
    this.model.mutateData(data)
    console.log(`Executing passToModel with data eq ${data}`)
  }

  passToView(data) {
    this.view.assignDataToElements(data)
    console.log(`Executing passToView with data eq ${data}`)
  }
}

const app = new Controller(new Model(), new View())
