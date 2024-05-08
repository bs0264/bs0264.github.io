package variable;

public class Var04 {
	public static void main(String[] args) {
		//int x = 10;
		//int y = 20;
		int x = 10, y = 20;
		System.out.println("x : " + x + " / y : " + y);
		
		x = y; //x가 20으로 치환됨
		y = x; //y에 x값 넣음
		
		System.out.println("x : " + x + " / y : " + y);
		
		x = 10;
		System.out.println("x : " + x + " / y : " + y);
		
		//값 교환하려면? 임시 변수를 사용
		int z = x;
		x = y;
		y = z;
		System.out.println("x : " + x + " / y : " + y);
	}
}
