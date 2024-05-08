package dataType;

import java.io.IOException;

public class SysCharInput {
	public static void main(String[] args) throws IOException {
		char a = '0'; //'A' -> 65
		System.out.println(a);
		System.out.println((int)a); //'0'의 아스키 코드 값은 48
		
		System.out.println("2~9 사이의 숫자를 입력하셈 >>>");
//		int input = System.in.read() - 48;
		int input = System.in.read() - '0';
//		System.out.println(input);
		System.out.printf("입력하신 값은 %d입니다\n", input);
		
		//enter 값(lf(10), cr(13)) 입력
		//두 값을 처리해줘야 함
		System.in.read(); //lf
		System.in.read(); //cr
		
		System.in.skip(2);
		
		System.out.println("a~z 사이의 문자 하나를 입력하셈 >>>");
		int in = System.in.read();
		System.out.printf("입력하신 값은 %c입니다", in);
	}
}
