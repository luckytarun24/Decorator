//Decorator
const simpleDecorator = (target: typeof simpleDecoratorClass) => {
  console.log('in simple', target.prototype);
  target.prototype.changeMePlease = 'Simple Decorator Change Me';
};

function decoratorWithArugument(arg: string) {
  return (target: typeof simpleDecoratorClass) => {
    console.log(target.prototype);
    target.prototype.changeMePlease = arg;
  };
}

@decoratorWithArugument('Decorator With Arugument Change Me.')
@simpleDecorator
export class simpleDecoratorClass {
  changeMePlease: string | undefined;
  print() {
    console.log(this.changeMePlease);
  }
}

console.log('Initail');
const classMember = new simpleDecoratorClass();
console.log(classMember.changeMePlease);
