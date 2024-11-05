import { UserTest } from 'src/user-test/user-test.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NoteTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserTest, (userTest) => userTest.noteTest)
  userTest: UserTest;
}
