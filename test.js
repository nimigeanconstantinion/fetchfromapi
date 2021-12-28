

let f = () => {
    let uu = "hound";
    let uur = `https://dog.ceo/api/breed/${uu}/list`;
    fetch(uur).then((e) => {
        //console.log(e.json());
        return e.json();
    }).then(e => {
        console.log(e.message.length);
    });
}

f();