import uniqid from 'uniqid';

class CommandQueue {
  constructor(maxTasks){
    this.queue = [];
    this.maxTasks = maxTasks;
  }

  add(command){
    let task = {
      id: uniqid(),
      command: command
    };
    this.queue.push(task);
  }

  isBusy(){
    return this.queue.length >= this.maxTasks;
  }

  isEmpty(){
    return this.queue.length === 0
  }

  getTask(){
    if(this.queue.length){
      return this.queue[0];
    }

    return null;
  }

  removeTask(id){
    for(let i = 0; i < this.queue.length; i++){
      if(this.queue[i].id == id){
        this.queue.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

export { CommandQueue };