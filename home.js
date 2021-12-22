class Home {
    constructor() {
        this.rase = [];
      
        this.body = document.querySelector("body");
        this.main = document.createElement("main");
        this.body.appendChild(this.main);
        this.loadRase();
        this.mkMain();
    }

    loadRase = () => {
        let obj = "";
        
        fetch("https://dog.ceo/api/breeds/list/all")
            .then(e => {
                return e.json();
            }).then(e => {
                for (obj in e.message) {
                    this.rase.push(obj.toString());
                }
                return true;
            }).catch(() => {
                console.log("nu a mers");
                return false;
            });
        
    };
    
    myprom = () => {
        return new Promise((resolve, reject) => {
            if (this.loadRase) {
                resolve(this.mkMain());
            } else {
                reject(this.loadRase());
            }
        })
    }

    // // getImg = (rasa) => {
    // //     fetch("https://dog.ceo/api/breed/" + rasa + "/images/random").then(e => {
    // //         return e.json();
    // //     }).then(e => {
    // //         let elm = document.querySelector("imag");
    // //         elm.src = e.message;
    // //     }).catch(this.getImg(rasa));
    // // }

    mkCombo = (lista) => {
        // console.log(lista[0].toString());
        let cmb = document.createElement("select");
        cmb.className = "rase";
      
        lista.forEach(e => {
            let opt = document.createElement("option");
            opt.textContent = e.toString();
            cmb.appendChild(opt);
        });
        console.log(cmb);
        return cmb;
    }

    mkMain = () => {
        let b = "klwelmlewm";
        //aici am lista goala
        console.log(this.rase.length);
    }
}
export { Home };