class Context {
  constructor() {
    this.targets = document.querySelectorAll(".target");
    this.workspace = document.getElementById("workspace");
    // this.chosenTarget = null;
    this.state = new IdleState(this);
  }
  changeState(state) {
    this.state = state;
    console.log(`change state: ${this.state.constructor.name}`);
  }
}

class State {
  constructor(context) {
    this.context = context;
  }
}

class IdleState extends State {
  constructor(context) {
    super(context);
    // functions that binds to this object
    this.boundMouseDown = this.mouseDown.bind(this);
    this.boundDblClick = this.dblClick.bind(this);
    this.boundDeselect = this.deselect.bind(this);
    // targets -- mouse down event listener
    for (let target of this.context.targets) {
      target.addEventListener("mousedown", this.boundMouseDown);
      target.addEventListener("dblclick", this.boundDblClick);
    }
    // workspace -- click event listener
    this.context.workspace.addEventListener("click", this.boundDeselect);
  }
  deselect(event) {
    if (event.target != this.context.workspace) return;
    console.log(`deselect`);
    for (let target of this.context.targets) {
      target.style.backgroundColor = "red";
    }
  }
  mouseDown(event) {
    console.log(`mouse down`);
    this.changeState(new MouseDownState(this.context, event.target));
  }
  dblClick(event) {
    console.log("dblclick");
    this.changeState(new DragState(this.context, event.target));
  }
  changeState(state) {
    // remove event listener
    for (let target of this.context.targets) {
      target.removeEventListener("dblclick", this.boundDblClick);
      target.removeEventListener("mousedown", this.boundMouseDown);
    }
    this.context.workspace.removeEventListener("click", this.boundDeselect);
    // change state
    this.context.changeState(state);
  }
}
class MouseDownState extends State {
  constructor(context, target) {
    super(context);
    this.target = target;
    this.boundMouseUp = this.mouseUp.bind(this);
    this.boundDrag = this.drag.bind(this);
    this.target.addEventListener("mouseup", this.boundMouseUp);
    this.context.workspace.addEventListener("mousemove", this.boundDrag);
  }
  mouseUp(event) {
    console.log(`mouse up`);
    for (let target of this.context.targets) {
      target.style.backgroundColor = "red";
    }
    event.target.style.backgroundColor = "blue";
    // remove event listener
    this.target.removeEventListener("mouseup", this.boundMouseUp);
    this.context.workspace.removeEventListener("mousemove", this.boundDrag);
    // change IdleState
    this.context.changeState(new IdleState(this.context));
  }
  drag(event) {
    console.log("start drag");
    // remove event listener
    this.target.removeEventListener("mouseup", this.boundMouseUp);
    this.context.workspace.removeEventListener("mousemove", this.boundDrag);
    // change to DragState
    this.context.changeState(new DragState(this.context, event.target));
  }
}

class DragState extends State {
  constructor(context, target) {
    super(context);
    // target
    this.target = target;
    const { x, y } = target.getBoundingClientRect();
    this.originalPosition = { x, y };
    // bind function and add event listener
    this.boundDrag = this.drag.bind(this);
    this.boundMouseUp = this.mouseUp.bind(this);
    this.boundAbort = this.abort.bind(this);
    this.context.workspace.addEventListener("mousemove", this.boundDrag);
    this.context.workspace.addEventListener("mouseup", this.boundMouseUp);
    this.context.workspace.addEventListener("keydown", this.boundAbort); // need to add "tabindex" property on workspace to make it work
  }
  drag(event) {
    console.log("dragging");
    let { x, y } = this.target.getBoundingClientRect();
    this.target.style.left = x + event.movementX + "px";
    this.target.style.top = y + event.movementY + "px";
  }
  mouseUp(event) {
    console.log("mouseup: end dragging");
    this.changeState(new EndState(context));
  }
  abort(event) {
    if (event.key != "Escape") {
      return;
    }
    console.log("abort: return to original position");
    this.target.style.left = this.originalPosition.x + "px";
    this.target.style.top = this.originalPosition.y + "px";
    this.changeState(new EndState(context));
  }
  changeState(state) {
    // remove event listener
    this.context.workspace.removeEventListener("mousemove", this.boundDrag);
    this.context.workspace.removeEventListener("mouseup", this.boundMouseUp);
    this.context.workspace.removeEventListener("keydown", this.boundabort);
    // change to assigned state
    this.context.changeState(state);
  }
}

class EndState extends State {
  /*
  The state to go when a complex event is finished.
  It will buffer a click event, and go back to IdleState.
  (because if the IdleState detect a click event, it will deselect)
  */
  constructor(context) {
    super(context);
    this.boundToIdle = this.toIdle.bind(this);
    this.context.workspace.addEventListener("click", this.boundToIdle);
  }
  toIdle() {
    this.context.workspace.removeEventListener("click", this.boundToIdle);
    this.context.changeState(new IdleState(context));
  }
}

// a context object
let context = new Context();
