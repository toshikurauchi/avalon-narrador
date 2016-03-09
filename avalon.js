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
    var lancelot1 = $('#lancelot1').hasClass('btn-selected');
    var lancelot3 = $('#lancelot3').hasClass('btn-selected');
    
    var seq = ["todos fecham os olhos e estendem as maos", " "];
    if (lancelot1) {
        seq.push.apply(seq, ["o Lancelot do mal faz um sinal com o polegar", " "]);
    }
    seq.push.apply(seq, ["os do mal", "_"]);
    if (oberon) {
        seq.push.apply(seq, ["menos o Oberon", " "]);
        if (lancelot1) {
            seq.push.apply(seq, ["e o Lancelot do mal", " "]);
        }
    }
    else if (lancelot1) {
        seq.push.apply(seq, ["menos o Lancelot do mal", " "]);
    }
    seq.push.apply(seq, ["abrem os olhos", "54321"]);
    if (lancelot1) {
        seq.push.apply(seq, ["o Lancelot do mal abaixa os dedos", " "]);
    }
    seq.push.apply(seq, ["os do mal fecham os olhos", " ", "os do mal", "_"]);
    if (mordred) {
        seq.push.apply(seq, ["menos o Mordred", " "]);
    }
    seq.push.apply(seq, ["fazem um sinal com o polegar", " ", "o Merlin abre os olhos", " ", "54321", " ", "os do mal abaixam os dedos e o Merlin fecha os olhos"]);
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
        urls: ['http://www.ime.usp.br/~kurauchi/avalon-narrador/sound/narrador.m4a'],
        sprite: {
            "_": [400, 450],
            " ": [400, 700],
            "todos fecham os olhos e estendem as maos": [1100, 1950],
            "o Lancelot do mal faz um sinal com o polegar": [4100, 2200],
            "os do mal": [7300, 500],
            "menos o Oberon": [8700, 850],
            "e o Lancelot do mal": [10300, 1300],
            "menos o Lancelot do mal": [12600, 1300],
            "abrem os olhos": [14300, 900],
            "54321": [16000, 5000],
            "o Lancelot do mal abaixa os dedos": [22200, 2100],
            "os do mal fecham os olhos": [25400, 1400],
            "menos o Mordred": [29250, 1000],
            "fazem um sinal com o polegar": [30700, 1500],
            "o Merlin abre os olhos": [33000, 1400],
            "os do mal abaixam os dedos e o Merlin fecha os olhos": [35400, 2900],
            "Merlin e Morgana fazem um sinal com o polegar e o Percival abre os olhos": [39000, 4100],
            "Merlin e Morgana abaixam os dedos e o Percival fecha os olhos": [43800, 3400],
            "o Lancelot do bem e do mal abrem os olhos": [50600, 2300],
            "o Lancelot do bem o do mal fecham os olhos": [53400, 2400],
            "todos podem abrir os olhos": [56300, 2000],
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

$('#play').on('click', function(event) {
    event.preventDefault();
    sound = createSound();
    sound.sequence = makeSequence();
    sound.playSequence();
});

$('#stop').on('click', function(event) {
    event.preventDefault();
    sound.sequence = [];
    sound.stop();
});
