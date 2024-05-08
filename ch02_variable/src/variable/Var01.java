//package 선언
package variable;
//js: let , const , var //java: datatype으로 선언
//변수란? 값을 저장할 수 있는 메모리 공간의 이름
//변수를 쓰는 이유: 값의 재활용, 일괄 수정...
//변수 명명규칙: 대소문자 구분, 숫자로 시작 못함, 
//영문자,$,_만 사용 가능, 예약어 사용불가 
//클래스 첫 글자는 항상 대문자, 변수나 메소드 첫 글자는 소문자, 상수는 모두 대문자, CamelCase
public class Var01 {
	public static void main(String[] args) {
		//변수 선언시 타입 부여
		//let a = 7; a = "wow";
		int num1; //정수형 변수 num1 선언 - 메모리에 4byte 공간 확보
		// System.out.println(num1); //not have been initialized
		
		num1 = 7;
		System.out.println(num1);
		//num1 = "wow"; //정수형 변수라서 정수만 저장 가능
		
		//num2 정수형 변수 선언 및 10으로 초기화
		int num2 = 10;
		//num1, num2 더해서 num3 변수 만들기
		int num3 = num1 + num2 ;
		System.out.println(num3);
		System.out.println(num1 + " : " + num2 + " : " + num3);
	}
}
