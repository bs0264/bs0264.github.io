package ch03_operator;

public class Op06 {
	public static void main(String[] args) {
		//비트 연산자: 비트 단위(0과 1)로 연산
		// &, |, ^, !
		
		int n1 = 10;
		int n2 = 5;
		
		int result = n1 & n2;
		System.out.println(result);
		
		//10: 0000 1010
		// 5: 0000 0101
		// &: 
		//--------------
		//    0000 0000 => 0
		
		result = n1 | n2;
		System.out.println(result);
		
		// 10: 0000 1010
		//  5: 0000 0101
		//  &:
		// --------------
		//     0000 1111 => 15
		
		n1= 14;
		result = n1 ^ n2;
		System.out.println(result);
		
		// 14: 0000 1110
		//  5: 0000 0101
		//  ^:
		// --------------
		//     0000 1011 => 11
		
		//shift 연산자
	      // <<(left 연산자), >>(right 연산자)
	      
	      n1= 5;
	      System.out.println(n1<<1);
	      //left 연산자: 좌항의 변수값에 2의 n승을 곱한 결과
	      //5:  0000 0101
	      //<<1:0000 1010 => 10 //5 * 2^1
	      //<<2:0001 0100 => 20 //5 * 2^2
	      System.out.println(n1<<2);
	      
	      //right 연산자: 좌항의 변수값에 2의 n승으로 나눈 결과
	      System.out.println(n1>>1); // 5/2^1 
	      System.out.println(n1>>2); // 5/2^2
	}
}
