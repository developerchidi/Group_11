export const MAX_CONFESSION_LENGTH = 500;

export const THEME_OPTIONS = [
  {
    value: 'slate',
    label: 'Slate',
    chipClass: 'bg-slate-500',
  },
  {
    value: 'sky',
    label: 'Sky',
    chipClass: 'bg-sky-500',
  },
  {
    value: 'emerald',
    label: 'Emerald',
    chipClass: 'bg-emerald-500',
  },
  {
    value: 'amber',
    label: 'Amber',
    chipClass: 'bg-amber-500',
  },
  {
    value: 'rose',
    label: 'Rose',
    chipClass: 'bg-rose-500',
  },
];

const allowedThemeValues = new Set(THEME_OPTIONS.map((theme) => theme.value));

export function validateConfessionContent(content) {
  const normalized = typeof content === 'string' ? content.trim() : '';

  if (!normalized) {
    return 'Nội dung confession không được để trống.';
  }

  if (normalized.length > MAX_CONFESSION_LENGTH) {
    return `Nội dung tối đa ${MAX_CONFESSION_LENGTH} ký tự.`;
  }

  return '';
}

export function validateThemeColor(color) {
  if (!color || !allowedThemeValues.has(color)) {
    return 'Màu chủ đề không hợp lệ.';
  }

  return '';
}

export function validateIdentity(user) {
  if (!user || !user.id || !user.alias) {
    return 'Không tìm thấy định danh người dùng. Vui lòng tải lại trang.';
  }

  return '';
}

export function validatePostForm({ content, color, user }) {
  const errors = {
    content: validateConfessionContent(content),
    color: validateThemeColor(color),
    identity: validateIdentity(user),
  };

  return {
    errors,
    isValid: !errors.content && !errors.color && !errors.identity,
  };
}
