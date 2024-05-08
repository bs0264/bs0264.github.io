package dataType;

import java.util.Scanner;

public class ScannerEx {
	public static void main(String[] args) {
		
		// Scanner를 사용하려면 먼저 객체를 생성해야 함
		// - data 소스를 system의 inputstream으로 정함
		Scanner scan = new Scanner(System.in);
		System.out.println("첫 번째 정수를 입력하시오>>>");
		String str = scan.nextLine(); //"7"
		System.out.println(str);
		int num1 = Integer.parseInt(str); // 7
		
		System.out.println("두 번째 정수를 입력하시오>>>");
		int num2 = scan.nextInt();
		System.out.println(num2);
		
		System.out.println("첫 번째 입력값 " + num1 + "와 두 번째 입력값" + num2 + "의 합계는" +(num1+num2) + "입니다.");
	}
}
