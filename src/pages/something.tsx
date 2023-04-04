import Link from 'next/link';
import { type FormEventHandler } from 'react';
import { useState } from 'react';

import styles from '../styles/Task.module.css';

interface PageTemplateProps {
  title: string;
  children: React.ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

// PLEASE DO NOT EDIT THIS COMPONENT
export function PageTemplate({ title, children, onSubmit }: PageTemplateProps) {
  return (
    <>
      <main>
        <h1>{title}</h1>
        <form onSubmit={onSubmit}>
          <div className={styles['toggle-container']}>{children}</div>
          <button className={styles['submit-button']} type="submit">
            Submit
          </button>
        </form>
      </main>
      <footer>
        <Link href="/">Home</Link>
      </footer>
    </>
  );
}

type FormData = {
  id: number;
  value: boolean;
};

interface DataButton {
  data: FormData;
}
interface ToggleButtonProps extends DataButton {
  onChangeField: (value: any) => void;
}

// TODO: update this React component, you may change function signature
export function ToggleButton({ data, onChangeField }: ToggleButtonProps) {
  /**
   * Requirement:
   * - when clicking an unselected button, it will show a selected style "toggle-button-selected"
   * - when clicking a selected button, it should cancel the selection and no buttons are selected
   * - reuse the same button for task-two
   */
  const [select, setSelect] = useState<FormData>(data);
  return (
    <input
      type="button"
      className={
        select?.value
          ? styles['toggle-button-selected']
          : styles['toggle-button']
      }
      defaultValue={data?.id}
      onClick={(e) => {
        setSelect({ id: data?.id, value: !data?.value });
        onChangeField(select);
      }}
      onChange={(e) =>
        onChangeField({
          value: e.target.value,
        })
      }
    />
  );
}

// TODO: update this React component

const INITIAL_STATE = [
  {
    id: 0,
    value: false,
  },
  {
    id: 1,
    value: false,
  },
  {
    id: 2,
    value: false,
  },
  {
    id: 3,
    value: false,
  },
  {
    id: 4,
    value: false,
  },
  {
    id: 5,
    value: false,
  },
  {
    id: 6,
    value: false,
  },
  {
    id: 7,
    value: false,
  },
  {
    id: 8,
    value: false,
  },
  {
    id: 9,
    value: false,
  },
];

export default function TaskOne() {
  const [data, setData] = useState(INITIAL_STATE);
  const [selected, setSelected] = useState<FormData[]>([]);
  console.log('data:', data);
  function onChangeField(event: FormData) {
    console.log('event:', event);
    setSelected((prev) => {
      console.log('prev: ', prev);
      return [...prev, event];
    });
    alert(`You are currently selecting button ${event?.id}`);
  }
  console.log('selected: ', selected);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected?.length === 0) {
      alert('Please select a button');
      return;
    }
    alert(JSON.stringify(selected));
    /**
     * Requirement:
     * - if a button is selected, show alert "You are currently selecting button x"
     * - if no buttons are selected, show alert "Please select a button"
     * - there could only be one selected button at a time
     */
  };

  return (
    <PageTemplate title="Task 1" onSubmit={handleSubmit}>
      {/* {data?.map((val) => (
      ))} */}
      <ToggleButton
        data={data[0]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[1]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[2]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[3]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[4]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[5]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[6]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[7]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[8]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
      <ToggleButton
        data={data[9]}
        onChangeField={(e) => onChangeField(e)}
      ></ToggleButton>
    </PageTemplate>
  );
}
