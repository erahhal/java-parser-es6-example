import JavaParser from './vendor/java-parser/java-parser.js'

const javaText = `
import java.lang.FunctionalInterface;

// this is functional interface
@FunctionalInterface
interface MyInterface{
    // abstract method
    double getPiValue(int n);
}

public class HelloWorldExample {
    public static void main( String[] args ) {
      // declare a reference to MyInterface
      MyInterface ref;

      // lambda expression
      ref = n -> 3.1415;

      System.out.println("Value of Pi = " + ref.getPiValue());
    }
}
`;

const cst = JavaParser.parse(javaText);

// Use "BaseJavaCstVisitor" if you need to implement all the visitor methods yourself.
class LambdaArrowsPositionCollector extends JavaParser.BaseJavaCstVisitorWithDefaults {
  constructor() {
    super();
    this.customResult = [];
    this.validateVisitor();
  }

  lambdaExpression(ctx) {
    // Collects all the starting offsets of lambda arrows in lambdas with short (no parenthesis)
    // single argument lists: e.g:
    // - n -> n*n (will be collected)
    // - (n) -> n*n (not collected)
    if (ctx.lambdaParameters[0].children.Identifier) {
      this.customResult.push(ctx.Arrow[0].startOffset);
    }
  }
}

const lambdaArrowsCollector = new LambdaArrowsPositionCollector();
// The CST result from the previous code snippet
lambdaArrowsCollector.visit(cst);
const offsets = [];
lambdaArrowsCollector.customResult.forEach(arrowOffset => {
  offsets.push(arrowOffset);
});

document.body.innerHTML = `
<pre>
For the following code snippet:

${javaText}

The starting offsets for the lambda arrow with short (no parenthesis) single argument lists are:

${offsets}
</pre>
`;
