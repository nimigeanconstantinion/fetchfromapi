class NewHome {
    constructor() {
        this.rase = [];
        this.srase = [];
        this.body = document.querySelector("body");
        this.main = document.createElement("main");
        this.divcontainer = document.createElement("div");
        this.divcontainer.className = "container";

        this.divrase = document.createElement("div");
        this.divrase.className = "divrase";
        this.rasa = "";

        this.divcontainer.appendChild(this.divrase);


        this.divimag = document.createElement("div");
        this.divimag.className = "divimag";
        this.fimg = document.createElement("img");
        this.fimg.className = "imag";
        this.divimag.appendChild(this.fimg);
        this.p = document.createElement("p");
        this.p.textContent="Click to see more!"
        this.divimag.appendChild(this.p);
        this.divcontainer.appendChild(this.divimag);

        
        this.main.appendChild(this.divcontainer);

        

        this.body.appendChild(this.main);
        this.loadRase();
        this.main.addEventListener("change", (e) => {
            this.changeMain(e);
        })
        this.main.addEventListener("click", (e) => {
            this.clickmain(e);
        });
    }

    loadRase = () => {
        let obj = "";
        let lista=[]
        fetch("https://dog.ceo/api/breeds/list/all")
            .then(e => {
                return e.json();
            }).then(e => {
                for (obj in e.message) {
                    lista.push(obj.toString());
                }
                this.mkMain(lista);
            }).catch(() => {
                console.log("nu a mers");
                return false;
            });
        
    };
    
    loadSubrase = (rasa) => {
        let urlr = `https://dog.ceo/api/breed/${rasa}/list`;
        fetch(urlr).then((e) => {
            return e.json();
        }).then(e => {
            for (sr in e.message){
                this.srase.push(sr);
            }
            this.mkScombo(this.srase);
        });        
    }
    myprom = () => {
        return new Promise((resolve, reject) => {
            if (this.loadRase) {
                resolve(() => {

                    this.mkMain();

                })
            } else {
                reject(() => {

                })
            }
        })
    }

    getImg = (rasa) => {
        fetch("https://dog.ceo/api/breed/" + rasa + "/images/random").then(e => {
            console.log(e);
            return e.json();
        }).then(e => {
            this.mkimg(e.message);
            

        }).catch(console.log("eroare de imagine"));
    }

    mkimg = (img) => {
        this.fimg.src = img;
    }



    mkCombo = (lista) => {
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
    mkScombo = (lista) => {
        let scmb = document.createElement("select");
        scmb.className = "srase";
      
        lista.forEach(e => {
            let opt = document.createElement("option");
            opt.textContent = e.toString();
            scmb.appendChild(opt);
        });
        console.log(cmb);
        return scmb;
        
    }

    mkMain = (lista) => {
    
        this.divrase.appendChild(this.mkCombo(lista));
        this.divsrase = appendChild(this.mkScombo(this.rasa));
    }

    changeMain = (e) => {
        let sel = document.querySelector(".rase");
        this.rasa = sel.options[sel.selectedIndex].value;
        console.log(this.rasa);
        this.getImg(this.rasa);
        this.mkScombo(this.rasa);
    }

    clickmain = (e) => {
        let target = e.target;
        let cls = target.className;
        console.log(cls);
        switch (true) {
            case cls == "imag":
                this.getImg(this.rasa);
                break;
        }
    }

}
export { NewHome };