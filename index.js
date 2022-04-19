const InfiniteObserverList = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const observer = useRef();//타겟의 교차여부 확인을 위해
  //컴포넌트 내부에 가장 끝에 감지할 요소 추가, 
  //해당 요소의 정보 알기위해 observer라는 useRef선언...
  //useEffect로 요소 있는지 확인, 있을 시 page값 변경... 

  const getDatab = () => {
    Axios.get(`http://localhost:3001/board/paginate/${limit}/${offset}`)
      .then((response) => {
        setoffset(response.data.length)
        setLists(response.data)
      })
      .catch(() => {
        console.log("error");
      });
  };
  
  const getFetchData = () => {
    const url = `{api}/comments?_page=${page}&_limit=10`;
    fetch(url)
      .then((res) => res.json())
      .then((item) => setItems((prev) => [...prev, ...item]));
  };

  useEffect(() => page !== 0 && getFetchData(), [page]);

  const onIntersect = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) setPage((p) => p + 1);
  };

  useEffect(() => {
    if (!observer.current) return;

    const io = new IntersectionObserver(onIntersect, { threshold: 1 });
    io.observe(observer.current);

    return () => io && io.disconnect();
  }, [observer]);

  return (
    <div>
      {items?.map((item) => (
        <CommentItem key={item.id} item={item} />
      ))}
      <div ref={observer} />
    </div>
  );
};

export default InfiniteObserverList;