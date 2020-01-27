class Model {
  constructor() {
    this.data = {'Title':'Initial title'}
  }

  mutateData (data) {
    data['Title'] += ' and one more thing'
    this.callbackController(data)
  }

  callfromController (call) {
    this.callbackController = call
  }

}

class View {
  constructor () {
    this.root = document.getElementById('root')
    this.title = document.createElement('h1')
    this.input = document.createElement('input')
    this.input.placeholder = 'Type your own title'
    this.root.append(this.title, this.input)
  }

  assignDataToElements (data) {
    this.title.textContent = data['Title']
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
    this.model.callfromController(this.passToView.bind(this))
  }

  passToModel(data) {
    this.model.mutateData(data)
  }

  passToView(data) {
    this.view.assignDataToElements(data)
  }
}

const app = new Controller(new Model(), new View())
