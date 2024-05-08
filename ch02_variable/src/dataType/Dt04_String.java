package dataType;

public class Dt04_String {
	// 문자열(String)은 기본 데이터 타입이 아니다.
	// 참조변수 - 클래스 타입이다.
	public static void main(String[] args) {
		int a = 7;
		int b = new Integer(7);
		//참조 타입
		Integer c = new Integer(7); //
		
		//a. // 기본타입 이여서 객체가 아니고 따라서 값을 가질 뿐 다른 요소는 갖고 있지 않다
		//b.
		//c.hashCode()//참조타입이여서 Integer 클래스가 가지고 있는 필드나 메소드를 사용할 수 있다.
		System.out.println(c.hashCode());
		//참조타입이여서 Integer 클래스가 가지고 있는 필드나 메소드를 사용할 수 있다.
		
		//기본 타입은 아니지만 마치 기본타입처럼 바로 값을 넣어 사용 가능
		//하지만 참조타입이고 알고보면 배열이다
		String str = "wow";
		String str1 = new String("wow");
		System.out.println(str.charAt(0));
	}
}
