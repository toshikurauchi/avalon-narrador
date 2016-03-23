$('.btn-personagem').on('click', function(event) {
    event.preventDefault();
    var curClass = 'btn-unselected';
    var newClass = 'btn-selected';
    if ($(this).hasClass(curClass)) {
        var thisLancelot = 'lancelot1';
        var otherLancelot = 'lancelot3';
        if ($(this).attr("id") === thisLancelot || $(this).attr("id") === otherLancelot) {
            if ($(this).attr("id") === otherLancelot) {
                otherLancelot = thisLancelot;
            }
            $("#"+otherLancelot).removeClass('btn-selected');
            $("#"+otherLancelot).addClass('btn-unselected');
        }
    }
    else {
        var aux = curClass;
        curClass = newClass;
        newClass = aux;
    }
    $(this).removeClass(curClass);
    $(this).addClass(newClass);
});

function makeSequence() {
    var morgana = $('#morgana').hasClass('btn-selected');
    var mordred = $('#mordred').hasClass('btn-selected');
    var oberon = $('#oberon').hasClass('btn-selected');
    var lancelot3 = $('#lancelot3').hasClass('btn-selected');
    var lancelot = lancelot3 || $('#lancelot1').hasClass('btn-selected');
    
    var seq = ["todos fecham os olhos e estendem as maos", " "];
    if (lancelot) {
        seq.push.apply(seq, ["o Lancelot do mal faz um sinal com o polegar", " "]);
    }
    if (oberon && lancelot) {
        seq.push.apply(seq, ["os do mal menos o Oberon e o Lancelot do mal abrem os olhos", " "]);
    }
    else if (oberon) {
        seq.push.apply(seq, ["os do mal menos o Oberon abrem os olhos", " "]);
    }
    else if (lancelot) {
        seq.push.apply(seq, ["os do mal menos o Lancelot do mal abrem os olhos", " "]);
    }
    else {
        seq.push.apply(seq, ["os do mal abrem os olhos", " "]);
    }
    seq.push.apply(seq, ["54321", " "]);
    if (lancelot) {
        seq.push.apply(seq, ["o Lancelot do mal abaixa os dedos", " "]);
    }
    seq.push.apply(seq, ["os do mal fecham os olhos", " "]);
    if (mordred) {
        seq.push.apply(seq, ["os do mal menos o Mordred fazem um sinal com o polegar", " "]);
    }
    else {
        seq.push.apply(seq, ["os do mal fazem um sinal com o polegar", " "]);
    }
    seq.push.apply(seq, ["o Merlin abre os olhos", " ", "54321", " ", "os do mal abaixam os dedos e o Merlin fecha os olhos", " "]);
    if (morgana) {
        seq.push.apply(seq, ["Merlin e Morgana fazem um sinal com o polegar e o Percival abre os olhos", " ", "54321", " ", "Merlin e Morgana abaixam os dedos e o Percival fecha os olhos", " "]);
    }
    if (lancelot3) {
        seq.push.apply(seq, ["o Lancelot do bem e do mal abrem os olhos", " ", "54321", " ", "o Lancelot do bem o do mal fecham os olhos", " "]);
    }
    seq.push.apply(seq, ["todos podem abrir os olhos"]);
    return seq;
}

function createSound() {
    return new Howl({
        urls: ['http://toshikurauchi.github.io/avalon-narrador/sound/narrador.mp3'],
        sprite: {
            " ": [400, 450],
            "todos fecham os olhos e estendem as maos": [950, 2100],
            "o Lancelot do mal faz um sinal com o polegar": [3900, 2300],
            "os do mal abrem os olhos": [61600, 1500],
            "os do mal menos o Oberon abrem os olhos": [7600, 2400],
            "os do mal menos o Oberon e o Lancelot do mal abrem os olhos": [10900, 3500],
            "os do mal menos o Lancelot do mal abrem os olhos": [15300, 2600],
            "54321": [18700, 5300],
            "o Lancelot do mal abaixa os dedos": [25300, 1900],
            "os do mal fecham os olhos": [28000, 1500],
            "os do mal fazem um sinal com o polegar": [30700, 1900],
            "os do mal menos o Mordred fazem um sinal com o polegar": [33600, 3000],
            "o Merlin abre os olhos": [37200, 1300],
            "os do mal abaixam os dedos e o Merlin fecha os olhos": [39300, 2900],
            "Merlin e Morgana fazem um sinal com o polegar e o Percival abre os olhos": [43300, 3900],
            "Merlin e Morgana abaixam os dedos e o Percival fecha os olhos": [48050, 3250],
            "o Lancelot do bem e do mal abrem os olhos": [52500, 2200],
            "o Lancelot do bem o do mal fecham os olhos": [55700, 2400],
            "todos podem abrir os olhos": [58900, 1500],
        },
        onend: function() {
            if (this.sequence.length>0) this.playSequence();
        }
    });
}
var sound = null;

Howl.prototype.playSequence = function(){
    if(this.sequence.length>0){
        this.play(this.sequence[0]);
        this.sequence = this.sequence.splice(1);
    }
};

function stop() {
    if (sound) {
        sound.sequence = [];
        sound.stop();
    }
}

$('#play').on('click', function(event) {
    event.preventDefault();
    stop();
    sound = createSound();
    sound.sequence = makeSequence();
    sound.playSequence();
});

$('#stop').on('click', function(event) {
    event.preventDefault();
    stop();
});
