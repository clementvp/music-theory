import Score from '../../components/Score/Score';

const Home = () => {
  return (
    <div className="home">
      this is home
      <div>
        <Score
          staves={[
            [
              { d: 'q', notes: ['Cb4', 'E#4', 'G4'] },
              { d: 'q', notes: ['E4', 'G4', 'B4'] },
            ],
            [{ d: 'q', notes: ['Cb4'] }],
          ]}
        ></Score>
      </div>
    </div>
  );
};

export default Home;
