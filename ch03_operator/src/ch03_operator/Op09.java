package ch03_operator;

public class Op09 {
	public static void main(String[] args) {
		//NaN: Not a Number
		//infinite: 무한대
		
		int a = 5;
		int b = 0;
		
		System.out.println(b / a);
		
		//java.lang.ArithmeticException: / by zero
		try {
			System.out.println(a / b); //infinite
		} catch (ArithmeticException e) {
	}	    System.out.println("0으로 나누지마");
	
	double c = 0.0;
	System.out.println(a / c);//infinity
	System.out.println(a % c);//NaN
	
	double d = 5* (a/c);
	System.out.println(d);
	
	if(Double.isFinite(d)) {
		System.out.println(5* (a/c));
	}else {
		System.out.println("무한대가 입력되어 처리 불가능!!");
	}
 }
}