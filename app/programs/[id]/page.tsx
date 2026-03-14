import MainLayout from '@/components/MainLayout';
import ProgramDetailBySlug from './ProgramDetailBySlug';

type Props = { params: Promise<{ id: string }> };

export default async function ProgramDetailRoutePage({ params }: Props) {
  const { id } = await params;
  return (
    <MainLayout>
      <ProgramDetailBySlug id={id} />
    </MainLayout>
  );
}
