// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory function for creating simulations of P. aequor, our mysterious organism
const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum,
        dna,
        //Method that simulates P. aequor's tendancy to mutate
        mutate() {
            const index = Math.floor(Math.random() * 16);
            let mutantBase = this.dna[index];
            let newBase = returnRandBase();
            if (mutantBase !== newBase) {
                this.dna.splice(index, 1, newBase);
                return this.dna;
            } else {
                this.mutate();
            };
        },
        //Method that allows us to compare an instance of P. aequor to another
        compareDNA(pAequor) {
            let matches = [];
            for (let i = 0; i < 15; i++) {
                if (this.dna[i] === pAequor.dna[i]) {
                    matches.push(pAequor.dna[i]);
                }
            }
            const percentage = Math.round((matches.length / 15) * 100);
            console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common.`);
        },
        //Method that will determine if an instance of P. aequor is likely to survive
        willLikelySurvive() {
            let targetBases = [];
            this.dna.forEach(element => {
                if (element === 'C' || element === 'G') {
                    targetBases.push(element);
                }
            });
            const percentage = Math.round((targetBases.length / 15) * 100);
            //Studies show that P. aequor is likely to survive if its DNA composition contains at least 60% 'C' or 'G'
            if (percentage >= 60) {
                return true;
            } else {
                return false;
            };
        }
    };
};
//Let's create a group of P. aequor instances that are likely to survive in order to study them.
let studyGroup = [];
let count = 1;
//30 instances should be enough...
while (studyGroup.length < 30) {
    let specimen = pAequorFactory(count, mockUpStrand());
    if (specimen.willLikelySurvive()) {
        studyGroup.push(specimen);
    };
    count++
};