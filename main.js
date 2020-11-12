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

const pAequorFactory = (number, DNA) => {
    return {
        specimenNum: number,
        dna: DNA,
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
        compareDNA(pAequor) {
            let matches = [];
            for (let i = 0; i < 15; i++) {
                if (this.dna[i] === pAequor.dna[i]) {
                    matches.push(pAequor.dna[i]);
                }
            }
            const percentage = Math.round((matches.length / 15) * 100);
            console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common.`);
        }
    };
};
const nokiDNA = ['C', 'A', 'T', 'G', 'C', 'A', 'T', 'G', 'C', 'A', 'T', 'G', 'C', 'A', 'T'];
const noki = pAequorFactory(1, nokiDNA);
/*console.log(noki.dna);
console.log(noki.mutate());*/
const nugget = pAequorFactory(2, mockUpStrand());

noki.compareDNA(nugget);



