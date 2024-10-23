class Car {
    private engine: boolean = false
    private speed: number = 0

    public turnOn() {
        this.engine = true
    }

    public turnOff() {
        this.engine = false
        this.speed = 0
    }

    public getState() {
        if (this.engine) {
            console.log('engine start, speed =', this.speed)
        } else {
            console.log('engine stopped')
        }
    }

    public setSpeed(changeSpeed: number) {
        if (!this.engine) {
            console.log('Двигатель выключен')
            return
        }

        if (changeSpeed < 0 || changeSpeed > 100) {
            console.log('Допустимые значения скорости [0; 100]')
        } else {
            this.speed = changeSpeed
        }
    }
}

const car1: Car = new Car()

car1.turnOn()
car1.setSpeed(101)
car1.setSpeed(1)
car1.getState()
car1.turnOff()
car1.setSpeed(100)


