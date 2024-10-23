// Задание 2 (-беск; -10] - очень холодно [-10; +10] - холодно [+10; +18] - прохладно [+18; +25] - тепло [+25; +беск] жарко

function checkT(temteratur: number): void {
    if (temteratur < -10) {
        console.log('Очень холодно')
    } else if (temteratur >= -10 && temteratur <= 10) {
        console.log('Холодно')
    } else if (temteratur > 10 && temteratur <= 18) {
        console.log('Прохладно')
    } else if (temteratur > 18 && temteratur < 25) {
        console.log('Тепло')
    } else if (temteratur >= 25) {
        console.log('Жарко')
    }
}

checkT(15)
