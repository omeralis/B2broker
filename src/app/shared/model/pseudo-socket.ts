export class PseudoSocketGeneration {
  keyOfData = ['id', 'int'];
  floadRandpn = (Math.random() * (100.12 - 0.02) + 0.02).toFixed(18);
  colors = { red: 'Red', blue: 'Blue', yellow: 'yellow' };
  ChildRandom(data: any) {
    return data[Math.floor(Math.random() * data.length)];
  }
  amount(num: number) {
    let data = [];
    let ArrayOfFrequency = [];
    for (let i = 0; i < num; ++i) data[i] = (i * 380) / 5;
    while (data.length > 0) {
      ArrayOfFrequency.push(data.splice(0, 2));
    }
    ArrayOfFrequency.unshift(this.keyOfData);
    return ArrayOfFrequency;
  }
  ColorRandom(obj: any) {
    let result;
    let count = 0;
    for (let prop in obj) if (Math.random() < 1 / ++count) result = prop;
    return result;
  }
  pseudoSocket(num: number) {
    let DataFrequency: any = [];
    for (let index = 0; index < num; index++) {
      DataFrequency.push({
        id: index + 1,
        int: Math.floor(Math.random() * 2000) + 1,
        float: +this.floadRandpn,
        color: this.ColorRandom(this.colors),
        child: {
          id: index + 1,
          color: this.ColorRandom(this.colors),
        },
      });
    }
    return DataFrequency.splice(-10);
  }
}
//   let DataOfFrequency: any = {};
//   let childFrequency: any = {};
//   let DataOfKeys: any = [];
//   let DataFrequency = [];
//   let ChildDataFrequency: any = [];
//   let ArrayOfFrequency = this.amount(num);
//   DataOfKeys = ArrayOfFrequency.shift();

//   for (let i = 0; i < ArrayOfFrequency.length; i++) {
//     DataOfFrequency = {};
//     childFrequency = {};
//     for (let k = 0; k < this.keyOfData.length; k++) {
//       DataOfFrequency[DataOfKeys[k]] = ArrayOfFrequency[i][k];
//     }
//     for (let k = 0; k < this.keyOfData.length; k++) {
//       childFrequency[this.keyOfData[k]] = ArrayOfFrequency[i][k];
//     }
//     Object.keys(childFrequency).forEach(() => {
//       childFrequency.color = this.ColorRandom(this.colors);
//     })
//     ChildDataFrequency.push(childFrequency);
//     Object.keys(DataOfFrequency).forEach(() => {
//       DataOfFrequency.id =i+1;
//       // DataOfFrequency.id = Math.floor(Math.random() * 1000) + 1;
//       DataOfFrequency.int = Math.floor(Math.random() * 2000) + 1;
//       DataOfFrequency.color = this.ColorRandom(this.colors);
//       DataOfFrequency.child = this.ChildRandom(ChildDataFrequency);
//       DataOfFrequency.float = +this.floadRandpn;
//     })
//     DataFrequency.push(DataOfFrequency);
//     // console.log('test' ,   DataFrequency);
//   }
//   return DataFrequency
