package dataType;

public class Printf {
	public static void main(String[] args) {

		//printf: 출력할 타입을 지정하고 내용을 뒤에 순서대로 붙여줌
		// 타입 지정: %c: char / %s:String / %d: 정수 / %f: 실수 / %b: boolean
		// \(이스케이프 문자): \n: 줄바꾸기, \t: tab, \\:백슬레시 ...
		System.out.println("문자" + 'A' + "의 유니코드 값은" + (int)'A' + "이다.");
		System.out.printf("문자 %c의 코드 값은 %d이다.\n", 'A', (int)'A');
		System.out.printf("문자 %c의 코드 값은 %d이다.\n", 'a', (int)'a');
		
		System.out.printf("3자리 숫자: %d는 %s다 => %b\n", 379, "짝수", false);
		System.out.printf("열 자리에 3자리 숫자 %10d 오른쪽 정렬함\n", 379,"짝수", false);
		System.out.printf("열 자리에 3자리 숫자 %-10d 왼쪽 정렬함\n", 379,"짝수", false);
		
		System.out.printf("열 자리에 3자리 숫자 %010d를 빈자리 0채움\n", 379);
		
		System.out.printf("%f를 소수점 2째자리 반올림하면 %.2f가 됩니다\n", 3.145678, 3.145678);
		System.out.printf("%f를 정수 다섯자리, 소수점 2째자리 반올림하면 %7.2f가 됩니다\n", 3141.4324, 3141.4324);
	}
}
