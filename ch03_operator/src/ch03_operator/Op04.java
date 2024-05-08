package ch03_operator;

public class Op04 {
	public static void main(String[] args) {
		// 증감 연산자
		// ++, --
	
		int num = 10;
		System.out.println(num);
		num++;
		System.out.println(num);
		num--;
		System.out.println(num);
		
		// 전위 증감, 후위 증감: 연산 우선순위 차이
		int num2 = 10;
		int num3 = num2++;
		System.out.printf("num2 = %d, num3 = %d\n", num2 , num3);
	}
}
