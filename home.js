class Home {
    constructor() {
        this.rase = [];
        this.srase = [];
        this.body = document.querySelector("body");
        this.body.innerHTML = ``;
        this.main = document.createElement("main");

        this.divcontainer = document.createElement("div");
        this.divcontainer.className = "container";

        this.divrase = document.createElement("div");
        this.divrase.className = "selectie";
        this.rasa = "";
        this.srasa = "";
        this.selrase = document.createElement("select");
        this.selrase.className = "sel rase";

        this.selsrase = document.createElement("select");
        this.selsrase.className = "sel subrase";

        this.divrase.appendChild(this.selrase);
        this.divrase.appendChild(this.selsrase);


        this.divcontainer.appendChild(this.divrase);

//adaug div de imagine
        this.divimag = document.createElement("div");
        this.divimag.className = "imagine";

        this.fimg = document.createElement("img");
        this.fimg.id = "imag";
        this.divimag.appendChild(this.fimg);

        this.p = document.createElement("p");
       // this.p.textContent="Click to see more!"
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
        let lista = [];
        this.srasa = "";
        this.srase = [];
        fetch("https://dog.ceo/api/breeds/list/all")
            .then(e => {
                return e.json();
            }).then(e => {
                for (obj in e.message) {
                    lista.push(obj.toString());
                }
                this.rase =lista;
                this.mkMain(lista);
            }).catch(() => {
                console.log("nu a mers");
                return false;
            });
        
    };
    
    loadSubrase = (rasa) => {
        let lista = [];
        this.srase = [];
        this.srasa = "";
        let uur = "https://dog.ceo/api/breed/" + rasa + "/list";
        this.srase = [];
        let obj = {};
        fetch(uur).then(e => {
            return e.json();
        }).then(e => {
            lista = e.message;
            this.srase = lista;
            this.mkScombo(lista);
        });
    }

   

    getImg = (rasa, srasa) => {
        let urli = "";
        if (srasa.length == 0||srasa.includes("Choose")) {
            urli = `https://dog.ceo/api/breed/${rasa}/images/random`;
        } else {
            urli=`https://dog.ceo/api/breed/${rasa}/${srasa}/images/random`;            
        }
        console.log(urli);    
        fetch(urli).then(e => {
            console.log(e);
            return e.json();
        }).then(e => {
            this.mkimg(e.message);
        }).catch(console.log("eroare de imagine"));
    }

    mkimg = (img) => {
        this.fimg.src = img;
        this.p.textContent = "Click for more...";
        
    }



    mkCombo = (lista) => {
        this.selrase.innerHTML = ``;
        console.log(this.selrase);        
        let opt = document.createElement("option");
        opt.textContent = "Choose a breed"
        opt.id = "uns";
        opt.disabled = true;
        opt.hidden = true;
        opt.selected = true;

        this.selrase.appendChild(opt);
        lista.forEach(e => {
            opt = document.createElement("option");
            opt.textContent = e.toString();
            this.selrase.appendChild(opt);
        });
        //return cmb;
    }

    mkScombo = (lista) => {
        this.selsrase.innerHTML = ``;
        this.srase = lista;
        console.log("lista de subrase are lungimea ="+lista.length);        
        let opt = document.createElement("option");
        opt.textContent = "Choose a subbreed"
        opt.id = "uns";
        opt.disabled = true;
        opt.hidden = true;
        opt.selected = true;
        this.selsrase.appendChild(opt);
      
        if (lista.length > 0) {
            lista.forEach(e => {
                let opt = document.createElement("option");
                opt.textContent = e.toString();
                console.log(e.toString);
                this.selsrase.appendChild(opt);
            });
                
        }
        
        
    }

    mkMain = (lista) => {
    
        this.mkCombo(lista);
  //      this.divsrase = appendChild(this.mkScombo(this.rasa));
    }

    changeMain = (e) => {
        let target = e.target;
        let cls = target.className;
        let sel = "";
        switch (true) {
            case cls == "sel rase":
                sel = document.querySelector(".sel.rase");
                this.rasa = sel.options[sel.selectedIndex].value;
                
                this.getImg(this.rasa, "");
                this.srasa = "";
                this.srase = [];
                this.loadSubrase(this.rasa);                   
            case cls == "sel subrase":
                this.srasa = "";
                sel = document.querySelector(".sel.subrase");
                this.srasa = sel.options[sel.selectedIndex].value;
                
                this.getImg(this.rasa,this.srasa);
        }
 
     }

    clickmain = (e) => {
        let target = e.target;
        let cls = target.className;
        let idc = target.id;
        console.log(e.target);

        switch (true) {
            case cls == "imagine"||idc=="imag"||e.target.textContent.includes("for more"):
                let sel = document.querySelector(".sel.rase");
                let sels = document.querySelector(".sel.subrase");

                this.rasa = sel.options[sel.selectedIndex].value;
                this.srasa = sels.options[sels.selectedIndex].value;

                this.getImg(this.rasa, this.srasa);
                break;
        }
    }

}
export { Home };