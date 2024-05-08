package dataType;

public class Dt01_Number {
	//변수: 기본형(primitive) / 참조형(reference)
	//primitive type의 number 타입 : 정수형, 실수형
	public static void main(String[] args) {
		//정수타입: byte, char, short, int, long
	    //byte수 :  1  /  2   /  2  /  4 /  8
	      
        //byte: 1byte = 8bit / bit: 0 or 1을 담을 수 있는 공간(최소크기)
        //1 byte: 0000 0000 - 2^8 = 256가지 경우의 수 => 10진수로 +127~-128까지 표현 가능
		
		byte var1 = -128;
		byte var2 = -30;
		byte var3 = -127;
//		byte var4 = 128; //Type mismatch: cannot convert from int to byte
		
		byte var5 = 125; //1byte에 저장
		int var6 = 125; //4byte에 저장
		
		for(int i = 0; i < 5; i++) {
			var5++;
			var6++;
			System.out.println("var5 : " + var5 + " / var6 : " + var6);
			//128은 byte 변수의 범위를 넘어서므로 변수 표현의 최소값부터 다시 시작
		}
		
		//int의 범위: -2^31 ~ 2^31-1: -2147483648 ~ 2147483647
		int num1 = 2111111111;
		//long의 범위: -2^63 ~ 2^63-1
		long num2 = 9111111111111111111L;
		
		int num3 = num1 * 2;
		System.out.println(num3);
		
		//실수 타입: float / double
		//byte 수:   4  /    8
		//저장방식이 달라서 더 넓은 범위의 수 저장 가능
		
		float f1 = 3.14f;
		double d1 = 3.14;
		
		int var7 = 3000000;
	      float var8 = 3e6f; //3 * 10^6 : 3000000.0
	      double var9 = 3e6;
	      double var10 = 2e-3; // 2*10^-3 : 0.002
	      
	      System.out.println(var8);
	      System.out.println(var9);
	      System.out.println(var10);
	}
}
