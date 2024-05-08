package dataType;

public class Casting02 {
	public static void main(String[] args) {
		int intV = 10;
		double doubleV = 5.5;
		
		double resultD = intV + doubleV; //자동 형변환 int + double -> double
		System.out.println(resultD);
//		int resultI = intV + (int)doubleV;
		int resultI = (int)(intV + doubleV);
		System.out.println(resultI);
		
		char a = 'A';
		char b = 'A' + 1; //char 'A' + 1 -> 'B'
		System.out.println(a + " : " + b);
		
		//char c = a + 1; //변수를 정수와 연산하면 int로 형변환
		int c = a + 1;
		System.out.println(c);
		char d = (char)(c + 1);
		System.out.println(d);
		
		//초기화 에러
		String str = ""; //빈문자열 초기화
		int num = 0;
		//char e =''; //char 빈 문자로 초기화 불가
		
		//int보다 작은 타입을 연산하면 자동으로 int로 형변환됨
		byte b1 = 10;
		byte b2 = 20;
		byte result = (byte) (b1 + b2);
	}
}
