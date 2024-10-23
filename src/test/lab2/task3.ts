class Car {
    private engine: boolean = false
    public turnOn() {
        this.engine = true
    }
    public turnOff() {
        this.engine = false
    }
    public getState() {
        if (this.engine) {
            console.log('engine start')
        } else {
            console.log('engine stopped')
        }
    }
}

const car1: Car = new Car()
car1.getState()
car1.turnOn()
car1.getState()
car1.turnOff()
car1.getState()

