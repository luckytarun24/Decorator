//Decorator
//Defination - Decorator are notation to add meta data to cretain type. It simple use using @decoratorName.It can be attached to a class declaration, method, accessor, property, or parameter.

// Class Decorator

//In this decorator we get whole class as parameter.And then inside function we an play with class and can add meta data to it.
const simpleDecorator = (target: typeof simpleDecoratorClass) => {
  // Here we are manipulating with class variable.
  console.log('Inside method class decorator---->');
  target.prototype.changeMePlease = 'Simple Decorator Change Me';
};

//In this decorator we get an argument and return an callback wich parameter contain class as target.This also know as decorator factory
function decoratorWithArugument(arg: string) {
  console.log('Inside method class decorator factory---->');
  return (target: typeof simpleDecoratorClass) => {
    target.whereIam = arg;
  };
}

// Method Decorator
//Defination -: The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition.
// Three argument it take -:
// traget - : Either the constructor function of the  class for a static member, or the prototype of the class for an instance member.
// propertyKey -: The name of the member.
// propertyDescriptor -:  The Property Descriptor for the member.

//In this example we are adding error handling to the fetchData function.
function logErrorMethodDecorator(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor
) {
  console.log('Inside method decorator---->');
  console.log(
    `Target value---> ${target},\nFunction name---> ${propertyKey},\n function defination---> ${propertyDescriptor}`
  );
  const orginalFunction = propertyDescriptor.value;
  const newFunction = function (...args: any[]) {
    try {
      const response = orginalFunction.apply(null, args);
      return response;
    } catch (error) {
      console.log(`error ---> ${error}`);
    }
  };
  return { ...propertyDescriptor, newFunction };
}

//Property decorator
// defination -:A Property Decorator is declared just before a property declaration.
// Two  argument it take -:
// traget - : Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// propertyKey -: The name of the member.
function propertyDecorator(target: Object, propertyKey: string) {
  let value: any;
  console.log('Inside property decorator---->');
  console.log(`Target value---> ${target},\nProperty name---> ${propertyKey}`);
  const getter = () => {
    console.log('getting value......');
    return value;
  };
  const setter = (newValue: any) => {
    console.log(`setting value----> ${newValue}`);
    value = newValue;
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}

//Parameter decorator
// defination -: A Parameter Decorator is declared just before a parameter declaration. The parameter decorator is applied to the function for a class constructor or method declaration.
// Three argument it take -:
// target - Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// propertyName - The name of the member.
// descriptor - The ordinal index of the parameter in the function’s parameter list.

function parameterDecorator(target: any, propertyName: string, index: number) {
  console.log('Inside parameter decorator---->');
  console.log(
    `Target value---> ${target},\nparameter name---> ${propertyName},\nindex---->${index}`
  );
}

//Main class
@decoratorWithArugument('Now I am in decoratorWithArugument')
@simpleDecorator
export class simpleDecoratorClass {
  @propertyDecorator
  changeMePlease: string | undefined;
  static whereIam = 'In main class';
  @logErrorMethodDecorator
  fetchData() {
    throw 'Please handle my error!!';
  }
  printMe(@parameterDecorator value: string = '') {
    console.log(`value = ${value}`);
  }
}

console.log('Initail');
const classMember = new simpleDecoratorClass();
console.log(classMember.changeMePlease);
console.log(simpleDecoratorClass.whereIam);
classMember.printMe('heyy it parameter decorator!');
classMember.fetchData();
