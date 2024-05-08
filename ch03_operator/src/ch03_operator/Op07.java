package ch03_operator;

import java.util.Scanner;

public class Op07 {
	public static void main(String[] args) {
		//3항식: 조건식? true의 반환값 : false의 반환값
		
		//Scanner로 숫자 입력 받아 3항식으로 짝수 홀수 판단해서 출력
		
		Scanner scan = new Scanner(System.in);
		int str = scan.nextInt();
		System.out.println(str % 2 == 0? "짝수" : "홀수");
	}
}
