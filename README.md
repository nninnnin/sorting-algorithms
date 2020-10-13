# Visualizing Sorting algorithms

VanillaJS를 사용하여 퀵소트, 머지소트, 버블소트, 인서션소트를 구현하고 퀵소트, 버블소트, 인서션소트를 DOM 조작으로 시각화 하였습니다.

영상 링크\
[퀵소트](https://www.youtube.com/watch?v=V-DAqbhpIkE)\
[버블소트](https://www.youtube.com/watch?v=uJb27VCZ3tg)\
[인서션소트](https://www.youtube.com/watch?v=IOz3xPF1s_w)

구현 시 고려한 사항
- 정렬 알고리즘과 시각화 로직을 분리하기 위해 Queue를 사용
- 정렬 시 시각화에 필요한 작업 단위를 객체화 하여 Queue에 저장 후, 비동기적으로 (async-await) 저장된 작업을 차례로 가져와 작업에 해당하는 장면을 시각화하는 함수를 호출하도록 구현
